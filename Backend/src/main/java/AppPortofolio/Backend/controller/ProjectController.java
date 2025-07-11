package AppPortofolio.Backend.controller;

import AppPortofolio.Backend.model.Project;
import AppPortofolio.Backend.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    @Autowired
    private ProjectService projectService;
    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }
}

