package SyncNotes.Sync.Notes.Taking.Application.Services;

import SyncNotes.Sync.Notes.Taking.Application.Models.Note;
import SyncNotes.Sync.Notes.Taking.Application.Models.NoteRequest;
import SyncNotes.Sync.Notes.Taking.Application.Repository.NoteRepo;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class NoteService {

    private final NoteRepo noteRepo;

    @Autowired
    public NoteService(NoteRepo noteRepo)
    {
        this.noteRepo = noteRepo;
    }


    public ResponseEntity<?> getAll() {

        List<Note> data = noteRepo.findAll();

        if(data.isEmpty())
            return new ResponseEntity<>(HttpStatus.valueOf(400));

        return ResponseEntity.status(HttpStatus.valueOf(200)).body(Map.of("Note", data));
    }

    public ResponseEntity<?> createNote(NoteRequest noteRequest) {

        Optional<Note> existData = noteRepo.findByTitle(noteRequest.getTitle());

        if(existData.isPresent())
        {
            return new ResponseEntity<>(HttpStatus.valueOf(400));
        }

        Note newNote = new Note();
        newNote.setTitle(noteRequest.getTitle());
        newNote.setContent(noteRequest.getContent());

        noteRepo.save(newNote);

        return ResponseEntity.status(HttpStatus.valueOf(200)).body(Map.of("message", "successfully added"));
    }




    public ResponseEntity<?> deleteById(UUID id) {

        if(noteRepo.existsById(id))
        {
            noteRepo.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(Map.of("message", "Deleted Successfully!"));
        }

        return ResponseEntity.status(HttpStatus.valueOf(400)).body("something wrong");
    }

    public ResponseEntity<?> updateNote(NoteRequest noteRequest, UUID id) {

        Note existNote = noteRepo.findById(id).orElseThrow(() -> new NoSuchElementException("note not found"));

        existNote.setTitle(noteRequest.getTitle());
        existNote.setContent(noteRequest.getContent());

        noteRepo.save(existNote);

        return new ResponseEntity<>("updated successfully", HttpStatus.ACCEPTED);

    }
}
