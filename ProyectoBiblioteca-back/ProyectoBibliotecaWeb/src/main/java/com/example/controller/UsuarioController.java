package com.example.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Usuario;
import com.example.service.UsuarioService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioController {
	
	@Autowired
    private UsuarioService usuarioService;

    // GET: listar todos los usuarios
    @GetMapping("/listar")
    public ResponseEntity<Map<String, Object>> listarUsuarios() {
        return usuarioService.listarUsuarios();
    }

    // GET: obtener un usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> obtenerUsuario(@PathVariable Long id) {
        return usuarioService.obtenerUsuario(id);
    }

    // POST: guardar un nuevo usuario
    @PostMapping("/crear")
    public ResponseEntity<Map<String, Object>> guardarUsuario(@RequestBody Usuario usuario) {
        return usuarioService.guardarUsuario(usuario);
    }

    // PUT: actualizar un usuario por ID
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> actualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        return usuarioService.actualizarUsuario(id, usuario);
    }

    // DELETE: eliminar un usuario por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> eliminarUsuario(@PathVariable Long id) {
        return usuarioService.eliminarUsuario(id);
    }
    
    
    @GetMapping("/perfil")
    public ResponseEntity<Map<String, Object>> obtenerPerfil(HttpServletRequest request) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        Claims claims = Jwts.parserBuilder()
            .setSigningKey("iXCsfxpwysFZJ4P27FMlSm9THCYiHJpZ".getBytes())
            .build()
            .parseClaimsJws(token)
            .getBody();

        String email = claims.getSubject(); 
        return usuarioService.buscarPorEmail(email);
    }
}
