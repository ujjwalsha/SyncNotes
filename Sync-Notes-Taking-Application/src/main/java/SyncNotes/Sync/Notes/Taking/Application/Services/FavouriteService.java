package SyncNotes.Sync.Notes.Taking.Application.Services;


import SyncNotes.Sync.Notes.Taking.Application.Models.Favourite;
import SyncNotes.Sync.Notes.Taking.Application.Models.Note;
import SyncNotes.Sync.Notes.Taking.Application.Repository.FavRepo;
import SyncNotes.Sync.Notes.Taking.Application.Repository.NoteRepo;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FavouriteService {

    private final NoteRepo noteRepo;
    private final FavRepo favRepo;

    @Autowired
    public FavouriteService(NoteRepo noteRepo, FavRepo favRepo)
    {
        this.noteRepo = noteRepo;
        this.favRepo = favRepo;
    }


    public ResponseEntity<?> addToFav(UUID id) {

        Note note = noteRepo.findById(id).orElseThrow(() -> new RuntimeException("Not found"));

        Optional<Favourite> optionalFav = favRepo.findFirstByOrderByIdAsc();

        Favourite fav;

        if(optionalFav.isPresent())
        {
            fav = optionalFav.get();
        }
        else
        {
            fav = new Favourite();
            favRepo.save(fav);
        }

        note.setFavourite(fav);
        noteRepo.save(note);

        return ResponseEntity.status(HttpStatus.OK).body(id);
    }

    public ResponseEntity<?> getAllFavourite() {

        Optional<Favourite> fav = favRepo.findFirstByOrderByIdAsc();

        if(fav.isPresent())
        {
            System.out.println(fav.get().getId());
            List<Note> allNote = noteRepo.findByFavouriteById(fav.get().getId());

            return ResponseEntity.status(HttpStatus.valueOf(200)).body(allNote);
        }

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("don's have fav");
    }


    public ResponseEntity<?> removeById(UUID id)
    {
        Note savedNote = noteRepo.findById(id).orElseThrow(()-> new RuntimeException("note not found"));

        savedNote.setFavourite(null);

        noteRepo.save(savedNote);

        return new ResponseEntity<>("Removed successfully!", HttpStatus.OK);
    }
}
