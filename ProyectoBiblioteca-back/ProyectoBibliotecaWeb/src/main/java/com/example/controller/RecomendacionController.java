package com.example.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Recomendacion;
import com.example.service.RecomendacionService;

@RestController
@RequestMapping("/recomendaciones")
public class RecomendacionController {
	
	@Autowired
    private RecomendacionService recomendacionService;

    @GetMapping("/listar")
    public ResponseEntity<Map<String, Object>> listarRecomendaciones() {
        return recomendacionService.listarRecomendaciones();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> obtenerRecomendacion(@PathVariable Long id) {
        return recomendacionService.obtenerRecomendacion(id);
    }
    
    @GetMapping("  ")
    public ResponseEntity<Map<String, Object>> obtenerRecomendacionesPorUsuario(@PathVariable Long id) {
        return recomendacionService.obtenerRecomendacionesPorUsuario(id);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> guardarRecomendacion(@RequestBody Recomendacion recomendacion) {
        return recomendacionService.guardarRecomendacion(recomendacion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> actualizarRecomendacion(@PathVariable Long id, @RequestBody Recomendacion recomendacion) {
        return recomendacionService.actualizarRecomendacion(id, recomendacion);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> eliminarRecomendacion(@PathVariable Long id) {
        return recomendacionService.eliminarRecomendacion(id);
    }
}
