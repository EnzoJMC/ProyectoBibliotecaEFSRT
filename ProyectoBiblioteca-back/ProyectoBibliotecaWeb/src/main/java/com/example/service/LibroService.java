package com.example.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.example.model.Libro;

public interface LibroService {

	public ResponseEntity<Map<String, Object>> listarLibros();
	public ResponseEntity<Map<String, Object>> guardarLibro(Libro libro);
	public ResponseEntity<Map<String,Object>> eliminarLibro(Long id);
	public ResponseEntity<Map<String,Object>> actualizarLibro(Long id, Libro libro);
	public ResponseEntity<Map<String,Object>> obtenerLibro(Long id);

	
}
