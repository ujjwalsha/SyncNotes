package SyncNotes.Sync.Notes.Taking.Application.Controller;

import SyncNotes.Sync.Notes.Taking.Application.Models.Note;
import SyncNotes.Sync.Notes.Taking.Application.Models.NoteRequest;
import SyncNotes.Sync.Notes.Taking.Application.Services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class NoteController {

    private final NoteService noteService;

    @Autowired
    public NoteController(NoteService noteService)
    {
        this.noteService = noteService;
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

}
