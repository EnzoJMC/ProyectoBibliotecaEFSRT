package com.example.serviceImpl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.model.Usuario;
import com.example.repository.UsuarioRepository;
import com.example.service.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService, UserDetailsService {
	
	@Autowired
    private UsuarioRepository usuarioRepository;

	@Autowired
	@Lazy
	private PasswordEncoder passwordEncoder;

	
    @Override
    public ResponseEntity<Map<String, Object>> listarUsuarios() {
        Map<String, Object> response = new HashMap<>();
        List<Usuario> usuarios = usuarioRepository.findAll();

        if (usuarios.isEmpty()) {
            response.put("mensaje", "No existen registros de usuarios.");
            response.put("status", HttpStatus.NOT_FOUND);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            response.put("mensaje", "Lista de usuarios obtenida exitosamente.");
            response.put("usuarios", usuarios);
            response.put("status", HttpStatus.OK);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
    }
    
    @Override
	public ResponseEntity<Map<String, Object>> guardarUsuario(Usuario usuario) {
		Map<String, Object> response = new HashMap<>();

		try {

			String passEncriptada = passwordEncoder.encode(usuario.getContrasena());
			usuario.setContrasena(passEncriptada);

			usuario.setFechaRegistro(LocalDateTime.now());

			Usuario nuevo = usuarioRepository.save(usuario);

			response.put("mensaje", "Usuario registrado correctamente.");
			response.put("usuario", nuevo);
			response.put("status", HttpStatus.CREATED);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (Exception e) {
			response.put("mensaje", "Error al registrar el usuario: " + e.getMessage());
			response.put("status", HttpStatus.BAD_REQUEST);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
	}
    
    @Override
    public ResponseEntity<Map<String, Object>> eliminarUsuario(Long id) {
        Map<String, Object> response = new HashMap<>();

        try {
            Optional<Usuario> usuario = usuarioRepository.findById(id);
            if (usuario.isEmpty()) {
                response.put("mensaje", "Usuario no encontrado.");
                response.put("status", HttpStatus.NOT_FOUND);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            } else {
                usuarioRepository.deleteById(id);
                response.put("mensaje", "Usuario eliminado correctamente.");
                response.put("status", HttpStatus.OK);
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }
        } catch (Exception e) {
            response.put("mensaje", "Error al eliminar el usuario: " + e.getMessage());
            response.put("status", HttpStatus.BAD_REQUEST);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @Override
    public ResponseEntity<Map<String, Object>> actualizarUsuario(Long id, Usuario usuario) {
        Map<String, Object> response = new HashMap<>();

        try {
            Optional<Usuario> usuarioExistente = usuarioRepository.findById(id);
            if (usuarioExistente.isEmpty()) {
                response.put("mensaje", "Usuario no encontrado.");
                response.put("status", HttpStatus.NOT_FOUND);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            } else {
                Usuario actual = usuarioExistente.get();
                actual.setNombre(usuario.getNombre());
                actual.setCorreo(usuario.getCorreo());
                actual.setContrasena(usuario.getContrasena());
                actual.setTipoUsuario(usuario.getTipoUsuario());
                actual.setFechaRegistro(usuario.getFechaRegistro());

                Usuario actualizado = usuarioRepository.save(actual);

                response.put("mensaje", "Usuario actualizado correctamente.");
                response.put("usuario", actualizado);
                response.put("status", HttpStatus.OK);
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }
        } catch (Exception e) {
            response.put("mensaje", "Error al actualizar el usuario: " + e.getMessage());
            response.put("status", HttpStatus.BAD_REQUEST);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @Override
    public ResponseEntity<Map<String, Object>> obtenerUsuario(Long id) {
        Map<String, Object> response = new HashMap<>();
        Optional<Usuario> usuario = usuarioRepository.findById(id);

        if (usuario.isEmpty()) {
            response.put("mensaje", "Usuario no encontrado.");
            response.put("status", HttpStatus.NOT_FOUND);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            response.put("mensaje", "Usuario encontrado.");
            response.put("usuario", usuario.get());
            response.put("status", HttpStatus.OK);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
    }

	@Override
	public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		Usuario usuario = usuarioRepository.findOneByCorreo(correo)
				.orElseThrow(() -> new UsernameNotFoundException("El usuario con email: " + correo + "no esta registrado."));
		
		return new UserDetailImplement(usuario);
	}

	@Override
	public ResponseEntity<Map<String, Object>> buscarPorEmail(String email) {
	    Map<String, Object> response = new HashMap<>();

	    try {
	        Optional<Usuario> usuarioOpt = usuarioRepository.findOneByCorreo(email);
	        
	        if (usuarioOpt.isPresent()) {
	            response.put("mensaje", "Usuario encontrado.");
	            response.put("usuario", usuarioOpt.get());
	            response.put("status", HttpStatus.OK);
	            return ResponseEntity.status(HttpStatus.OK).body(response);
	        } else {
	            response.put("mensaje", "Usuario no encontrado con el correo: " + email);
	            response.put("status", HttpStatus.NOT_FOUND);
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	        }
	    } catch (Exception e) {
	        response.put("mensaje", "Error al buscar usuario: " + e.getMessage());
	        response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	    }
	}

}
