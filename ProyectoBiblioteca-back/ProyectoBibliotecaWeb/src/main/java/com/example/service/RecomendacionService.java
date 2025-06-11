package com.example.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.example.model.Recomendacion;

public interface RecomendacionService {
	
	ResponseEntity<Map<String, Object>> listarRecomendaciones();
    ResponseEntity<Map<String, Object>> obtenerRecomendacion(Long id);
    ResponseEntity<Map<String, Object>> guardarRecomendacion(Recomendacion recomendacion);
    ResponseEntity<Map<String, Object>> actualizarRecomendacion(Long id, Recomendacion recomendacion);
    ResponseEntity<Map<String, Object>> eliminarRecomendacion(Long id);
    ResponseEntity<Map<String,Object>> obtenerRecomendacionesPorUsuario(Long id);
}
