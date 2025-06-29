package com.example.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.model.Reserva;
import com.example.repository.ReservaRepository;
import com.example.service.ReservaService;


@Service
public class ReservaServiceImpl implements ReservaService{
	
	@Autowired
    private ReservaRepository reservaRepository;

    @Override
    public ResponseEntity<Map<String, Object>> listarReservas() {
        Map<String, Object> response = new HashMap<>();
        List<Reserva> reservas = reservaRepository.findAll();

        if (reservas.isEmpty()) {
            response.put("mensaje", "No hay reservas registradas");
            response.put("status", HttpStatus.NOT_FOUND);
        } else {
            response.put("mensaje", "Lista de reservas");
            response.put("status", HttpStatus.OK);
            response.put("reservas", reservas);
        }
        return ResponseEntity.status((HttpStatus) response.get("status")).body(response);
    }

    @Override
    public ResponseEntity<Map<String, Object>> obtenerReserva(Long id) {
        Map<String, Object> response = new HashMap<>();
        Optional<Reserva> reserva = reservaRepository.findById(id);

        if (reserva.isEmpty()) {
            response.put("mensaje", "Reserva no encontrada");
            response.put("status", HttpStatus.NOT_FOUND);
        } else {
            response.put("mensaje", "Reserva encontrada");
            response.put("status", HttpStatus.OK);
            response.put("reserva", reserva.get());
        }
        return ResponseEntity.status((HttpStatus) response.get("status")).body(response);
    }

    @Override
    public ResponseEntity<Map<String, Object>> guardarReserva(Reserva reserva) {
        Map<String, Object> response = new HashMap<>();
        try {
            Reserva nueva = reservaRepository.save(reserva);
            response.put("mensaje", "Reserva registrada correctamente");
            response.put("reserva", nueva);
            response.put("status", HttpStatus.CREATED);
        } catch (Exception e) {
            response.put("mensaje", "Error al registrar la reserva: " + e.getMessage());
            response.put("status", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.status((HttpStatus) response.get("status")).body(response);
    }

    @Override
    public ResponseEntity<Map<String, Object>> actualizarReserva(Long id, Reserva reserva) {
        Map<String, Object> response = new HashMap<>();
        Optional<Reserva> existente = reservaRepository.findById(id);

        if (existente.isEmpty()) {
            response.put("mensaje", "Reserva no encontrada");
            response.put("status", HttpStatus.NOT_FOUND);
        } else {
            try {
                Reserva actual = existente.get();
                actual.setLibro(reserva.getLibro());
                actual.setUsuario(reserva.getUsuario());
                actual.setFechaReserva(reserva.getFechaReserva());
                actual.setEstado(reserva.getEstado());

                Reserva guardada = reservaRepository.save(actual);
                response.put("mensaje", "Reserva actualizada correctamente");
                response.put("reserva", guardada);
                response.put("status", HttpStatus.OK);
            } catch (Exception e) {
                response.put("mensaje", "Error al actualizar la reserva: " + e.getMessage());
                response.put("status", HttpStatus.BAD_REQUEST);
            }
        }
        return ResponseEntity.status((HttpStatus) response.get("status")).body(response);
    }

    @Override
    public ResponseEntity<Map<String, Object>> eliminarReserva(Long id) {
        Map<String, Object> response = new HashMap<>();
        Optional<Reserva> reserva = reservaRepository.findById(id);

        if (reserva.isEmpty()) {
            response.put("mensaje", "Reserva no encontrada");
            response.put("status", HttpStatus.NOT_FOUND);
        } else {
            try {
                reservaRepository.deleteById(id);
                response.put("mensaje", "Reserva eliminada correctamente");
                response.put("status", HttpStatus.OK);
            } catch (Exception e) {
                response.put("mensaje", "Error al eliminar la reserva: " + e.getMessage());
                response.put("status", HttpStatus.BAD_REQUEST);
            }
        }
        return ResponseEntity.status((HttpStatus) response.get("status")).body(response);
    }

    @Override
    public ResponseEntity<Map<String, Object>> obtenerReservasPorUsuario(Long usuarioId) {
        Map<String, Object> response = new HashMap<>();
        List<Reserva> reservas = reservaRepository.findByUsuarioId(usuarioId);

        if (reservas.isEmpty()) {
            response.put("mensaje", "No hay reservas para este usuario");
            response.put("status", HttpStatus.NOT_FOUND);
        } else {
            response.put("mensaje", "Reservas encontradas");
            response.put("status", HttpStatus.OK);
            response.put("reservas", reservas);
        }
        return ResponseEntity.status((HttpStatus) response.get("status")).body(response);
    }
}
