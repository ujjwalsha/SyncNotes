package SyncNotes.Sync.Notes.Taking.Application.Models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Fallback;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Data
@Entity
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 2000)
    private String content;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-mm-yyyy, hh:mm:ss")
    private Date updatedAt;

    @ManyToOne
    @JoinColumn(name = "favourite_id")
    @JsonIgnore
    private Favourite favourite;


    public Note()
    {
        updatedAt = new Date();
    }
}
