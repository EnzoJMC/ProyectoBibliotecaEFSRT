package com.example.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.example.model.Usuario;


public interface UsuarioService {

	public ResponseEntity<Map<String, Object>> listarUsuarios();
	public ResponseEntity<Map<String, Object>> guardarUsuario(Usuario usuario);
	public ResponseEntity<Map<String,Object>> eliminarUsuario(Long id);
	public ResponseEntity<Map<String,Object>> actualizarUsuario(Long id, Usuario usuario);
	public ResponseEntity<Map<String,Object>> obtenerUsuario(Long id);

}
