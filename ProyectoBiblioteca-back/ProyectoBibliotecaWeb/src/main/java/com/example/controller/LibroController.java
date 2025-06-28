package com.example.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.model.Libro;
import com.example.service.LibroService;

@RestController
@RequestMapping("/api/libros")
@CrossOrigin(origins = "http://localhost:4200")
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
    @PostMapping("/crear")
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
    
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadImagen(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Archivo vacío");
        }

        try {
            // Obtener ruta absoluta del directorio 'static/img'
            String rutaBase = new File("src/main/resources/static/img").getAbsolutePath();
            
            // Crear carpeta si no existe
            File carpeta = new File(rutaBase);
            if (!carpeta.exists()) {
                carpeta.mkdirs();
            }

            // Generar nombre único de archivo
            String nombreArchivo = file.getOriginalFilename();
            Path rutaArchivo = Paths.get(rutaBase, nombreArchivo);

            // Guardar archivo
            Files.write(rutaArchivo, file.getBytes());

            // Devolver solo el nombre o ruta relativa para acceder desde el frontend
            return ResponseEntity.ok("img/" + nombreArchivo); // Esto se puede usar directamente en <img src="/img/nombre.jpg">
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir el archivo");
        }
    }
	
}
