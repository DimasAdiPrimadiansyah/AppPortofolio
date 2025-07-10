package AppPortofolio.Backend.repository;

import AppPortofolio.Backend.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends
        JpaRepository<Project, Long> {
}

