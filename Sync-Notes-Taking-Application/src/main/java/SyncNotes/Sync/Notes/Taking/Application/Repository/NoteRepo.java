package SyncNotes.Sync.Notes.Taking.Application.Repository;

import SyncNotes.Sync.Notes.Taking.Application.Models.Note;
import SyncNotes.Sync.Notes.Taking.Application.Models.NoteRequest;
import org.aspectj.weaver.ast.Not;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface NoteRepo extends JpaRepository<Note, UUID> {

    @Query("SELECT n FROM Note n")
    List<Note> findAllNotes();

    Optional<Note> findByTitle(String title);

    @Query("SELECT n FROM Note n WHERE n.favourite = :id")
    List<Note> findByFavouriteById(@Param("id") UUID id);

    @Query("SELECT n FROM Note n ORDER BY n.createdAt DESC")
    List<Note> findLatestNotes();

    @Query("SELECT n FROM Note n WHERE LOWER(n.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(n.content) LIKE LOWER(CONCAT('%',:query, '%'))")
    List<Note> searchNotes(@Param("query") String query);
}
