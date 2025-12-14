package SyncNotes.Sync.Notes.Taking.Application.Repository;

import SyncNotes.Sync.Notes.Taking.Application.Models.Favourite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface FavRepo extends JpaRepository<Favourite, UUID> {

    Optional<Favourite> findFirstByOrderByIdAsc();
}
