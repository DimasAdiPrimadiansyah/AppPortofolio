package AppPortofolio.Backend.model;

import jakarta.persistence.ElementCollection;
import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity

@Data // dari Lombok
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String category;
    private Integer year;
    private String status;
    @ElementCollection
    private List<String> technologies;
    private String description;
    @ElementCollection
    private List<String> photos;
    private String githubUrl;
    private String liveUrl;
    @ElementCollection
    private List<String> tools;
    @ElementCollection
    private List<String> frameworks;
    @ElementCollection
    private List<String> ides;
}
