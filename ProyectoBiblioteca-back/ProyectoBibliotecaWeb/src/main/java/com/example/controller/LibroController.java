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

import com.example.model.Libro;
import com.example.service.LibroService;

@RestController
@RequestMapping("/api/libros")
public class LibroController {

	@Autowired
    private LibroService libroService;

    // GET: listar todos los libros
    @GetMapping("/listar")
    public ResponseEntity<Map<String, Object>> listarLibros() {
        return libroService.listarLibros();
    }
    
    @GetMapping("/test")
    public String test() {
    	String test = "asda";
    	return test;
    }

    // GET: obtener un libro por ID
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> obtenerLibro(@PathVariable Long id) {
        return libroService.obtenerLibro(id);
    }

    // POST: guardar un nuevo libro
    @PostMapping
    public ResponseEntity<Map<String, Object>> guardarLibro(@RequestBody Libro libro) {
        return libroService.guardarLibro(libro);
    }

    // PUT: actualizar un libro por ID
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> actualizarLibro(@PathVariable Long id, @RequestBody Libro libro) {
        return libroService.actualizarLibro(id, libro);
    }

    // DELETE: eliminar un libro por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> eliminarLibro(@PathVariable Long id) {
        return libroService.eliminarLibro(id);
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<Map<String, Object>> obtenerLibrosPorCategoria(@PathVariable String categoria) {
        return libroService.obtenerLibroPorCategoria(categoria);
    }
	
}
