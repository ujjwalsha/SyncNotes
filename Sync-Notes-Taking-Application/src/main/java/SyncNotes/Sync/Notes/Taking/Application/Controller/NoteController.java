package SyncNotes.Sync.Notes.Taking.Application.Controller;

import SyncNotes.Sync.Notes.Taking.Application.Models.Favourite;
import SyncNotes.Sync.Notes.Taking.Application.Models.Note;
import SyncNotes.Sync.Notes.Taking.Application.Models.NoteRequest;
import SyncNotes.Sync.Notes.Taking.Application.Services.FavouriteService;
import SyncNotes.Sync.Notes.Taking.Application.Services.NoteService;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api")
public class NoteController {

    private final NoteService noteService;
    private final FavouriteService favouriteService;

    @Autowired
    public NoteController(NoteService noteService, FavouriteService favouriteService )
    {
        this.noteService = noteService;
        this.favouriteService = favouriteService;
    }

    @GetMapping("all")
    public ResponseEntity<?> getAll()
    {
        return noteService.getAll();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createNote(@RequestBody NoteRequest noteRequest)
    {
        return noteService.createNote(noteRequest);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable UUID id)
    {
        return noteService.deleteById(id);
    }

    @PostMapping("/favourite/{id}")
    public ResponseEntity<?> addToFav(@PathVariable UUID id)
    {
        return favouriteService.addToFav(id);
    }

    @GetMapping("/favourite")
    public ResponseEntity<?> getAllFav()
    {
        return favouriteService.getAllFavourite();
    }

    @PutMapping("/notes/{id}")
    public ResponseEntity<?> updateNote(@RequestBody NoteRequest noteRequest, @PathVariable UUID id)
    {
        return noteService.updateNote(noteRequest, id);
    }

    @PutMapping("/remove/{id}")
    public ResponseEntity<?> removeById(@PathVariable UUID id)
    {
        return favouriteService.removeById(id);
    }
}
