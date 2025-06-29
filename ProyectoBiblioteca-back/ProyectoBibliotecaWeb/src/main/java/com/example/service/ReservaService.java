package com.example.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.example.model.Reserva;

public interface ReservaService {
	
	ResponseEntity<Map<String, Object>> listarReservas();

    ResponseEntity<Map<String, Object>> obtenerReserva(Long id);

    ResponseEntity<Map<String, Object>> guardarReserva(Reserva reserva);

    ResponseEntity<Map<String, Object>> actualizarReserva(Long id, Reserva reserva);

    ResponseEntity<Map<String, Object>> eliminarReserva(Long id);

    ResponseEntity<Map<String, Object>> obtenerReservasPorUsuario(Long usuarioId);
}
