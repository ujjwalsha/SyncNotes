package SyncNotes.Sync.Notes.Taking.Application.Models;

import jakarta.persistence.*;
import lombok.Data;

import java.awt.image.ImageProducer;
import java.util.List;
import java.util.UUID;

@Data
@Entity
public class Favourite {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @OneToMany(mappedBy = "favourite")
    private List<Note> notes;

}
