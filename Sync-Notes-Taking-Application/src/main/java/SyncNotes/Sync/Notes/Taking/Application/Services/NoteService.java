package SyncNotes.Sync.Notes.Taking.Application.Services;

import SyncNotes.Sync.Notes.Taking.Application.Models.Note;
import SyncNotes.Sync.Notes.Taking.Application.Models.NoteRequest;
import SyncNotes.Sync.Notes.Taking.Application.Repository.NoteRepo;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

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
}
