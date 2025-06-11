package com.example.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.model.Recomendacion;
import com.example.repository.RecomendacionRepository;
import com.example.service.RecomendacionService;

@Service
public class RecomendacionServiceImpl implements RecomendacionService {
	
	@Autowired
    private RecomendacionRepository recomendacionRepository;

    @Override
    public ResponseEntity<Map<String, Object>> listarRecomendaciones() {
        Map<String, Object> response = new HashMap<>();
        List<Recomendacion> recomendaciones = recomendacionRepository.findAll();

        if (recomendaciones.isEmpty()) {
            response.put("mensaje", "No hay recomendaciones registradas");
            response.put("status", HttpStatus.NOT_FOUND);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            response.put("mensaje", "Lista de recomendaciones");
            response.put("status", HttpStatus.OK);
            response.put("recomendaciones", recomendaciones);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
    }

    public ResponseEntity<Map<String, Object>> obtenerRecomendacionesPorUsuario(Long id) {
        Map<String, Object> response = new HashMap<>();
        List<Recomendacion> recomendaciones = recomendacionRepository.findByUsuarioId(id);

        if (recomendaciones.isEmpty()) {
            response.put("mensaje", "Recomendaciones no encontradas");
            response.put("status", HttpStatus.NOT_FOUND);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            response.put("mensaje", "Recomendaciones encontradas");
            response.put("status", HttpStatus.OK);
            response.put("recomendacion", recomendaciones);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
    }
    
    @Override
    public ResponseEntity<Map<String, Object>> obtenerRecomendacion(Long id) {
        Map<String, Object> response = new HashMap<>();
        Optional<Recomendacion> recomendacion = recomendacionRepository.findById(id);

        if (recomendacion.isEmpty()) {
            response.put("mensaje", "Recomendación no encontrada");
            response.put("status", HttpStatus.NOT_FOUND);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            response.put("mensaje", "Recomendación encontrada");
            response.put("status", HttpStatus.OK);
            response.put("recomendacion", recomendacion.get());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
    }

    @Override
    public ResponseEntity<Map<String, Object>> guardarRecomendacion(Recomendacion recomendacion) {
        Map<String, Object> response = new HashMap<>();
        try {
            Recomendacion nueva = recomendacionRepository.save(recomendacion);
            response.put("mensaje", "Recomendación registrada correctamente");
            response.put("recomendacion", nueva);
            response.put("status", HttpStatus.CREATED);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            response.put("mensaje", "Error al registrar la recomendación: " + e.getMessage());
            response.put("status", HttpStatus.BAD_REQUEST);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @Override
    public ResponseEntity<Map<String, Object>> actualizarRecomendacion(Long id, Recomendacion recomendacion) {
        Map<String, Object> response = new HashMap<>();
        Optional<Recomendacion> existente = recomendacionRepository.findById(id);

        if (existente.isEmpty()) {
            response.put("mensaje", "No se encontró la recomendación");
            response.put("status", HttpStatus.NOT_FOUND);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        try {
            Recomendacion actual = existente.get();
            actual.setTitulo(recomendacion.getTitulo());
            actual.setAutor(recomendacion.getAutor());
            actual.setRazon(recomendacion.getRazon());
            actual.setFecha(recomendacion.getFecha());
            actual.setUsuario(recomendacion.getUsuario());

            Recomendacion guardada = recomendacionRepository.save(actual);
            response.put("mensaje", "Recomendación actualizada correctamente");
            response.put("recomendacion", guardada);
            response.put("status", HttpStatus.OK);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("mensaje", "Error al actualizar la recomendación: " + e.getMessage());
            response.put("status", HttpStatus.BAD_REQUEST);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @Override
    public ResponseEntity<Map<String, Object>> eliminarRecomendacion(Long id) {
        Map<String, Object> response = new HashMap<>();
        Optional<Recomendacion> recomendacion = recomendacionRepository.findById(id);

        if (recomendacion.isEmpty()) {
            response.put("mensaje", "Recomendación no encontrada");
            response.put("status", HttpStatus.NOT_FOUND);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        try {
            recomendacionRepository.deleteById(id);
            response.put("mensaje", "Recomendación eliminada correctamente");
            response.put("status", HttpStatus.OK);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("mensaje", "Error al eliminar la recomendación: " + e.getMessage());
            response.put("status", HttpStatus.BAD_REQUEST);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
