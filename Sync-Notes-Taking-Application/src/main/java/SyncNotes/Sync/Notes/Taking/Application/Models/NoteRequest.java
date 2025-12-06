package SyncNotes.Sync.Notes.Taking.Application.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NoteRequest {

    private String title;
    private String content;
}
