package com.example.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Reserva;
import com.example.service.ReservaService;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "http://localhost:4200")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> listarReservas() {
        return reservaService.listarReservas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> obtenerReserva(@PathVariable Long id) {
        return reservaService.obtenerReserva(id);
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<Map<String, Object>> obtenerPorUsuario(@PathVariable Long id) {
        return reservaService.obtenerReservasPorUsuario(id);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> guardarReserva(@RequestBody Reserva reserva) {
        return reservaService.guardarReserva(reserva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> actualizarReserva(@PathVariable Long id, @RequestBody Reserva reserva) {
        return reservaService.actualizarReserva(id, reserva);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> eliminarReserva(@PathVariable Long id) {
        return reservaService.eliminarReserva(id);
    }
}
