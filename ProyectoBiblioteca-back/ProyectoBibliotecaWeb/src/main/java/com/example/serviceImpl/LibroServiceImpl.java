package com.example.serviceImpl;

import java.util.HashMap;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.model.Libro;
import com.example.repository.LibroRepository;
import com.example.service.LibroService;

@Service
public class LibroServiceImpl implements LibroService{

	@Autowired
	private LibroRepository libroRepository;
	
	@Override
	public ResponseEntity<Map<String, Object>> listarLibros() {
		
		Map<String, Object> response = new HashMap<>();
		List<Libro> libros = libroRepository.findAll();
		
		if( libros.isEmpty() ) {
			response.put("mensaje", "No existen registros para esta consulta");
			response.put("status", HttpStatus.NOT_FOUND);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		} else {
			response.put("mensaje", "Lista de libros completa");
			response.put("status", HttpStatus.OK);
			response.put("libros", libros);
			return ResponseEntity.status(HttpStatus.OK).body(response);
			
		}
	}

	@Override
	public ResponseEntity<Map<String, Object>> obtenerLibro(Long id) {
		
		Map<String, Object> response = new HashMap<>();
		
		Optional<Libro> libroObtenido = libroRepository.findById(id);
		if(libroObtenido.isEmpty()) {
			response.put("mensaje", "No existen registro para este producto");
			response.put("status", HttpStatus.NOT_FOUND);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		} else {
			response.put("mensaje", "libro encontrado");
			response.put("status", HttpStatus.OK);
			response.put("libro", libroObtenido);
			return ResponseEntity.status(HttpStatus.OK).body(response);
		}
	}

	@Override
	public ResponseEntity<Map<String, Object>> eliminarLibro(Long id) {
		Map<String, Object> response = new HashMap<>();

	    try {
	        Optional<Libro> libroActualizar = libroRepository.findById(id);

	        if (libroActualizar.isEmpty()) {
	        	
	        	response.put("mensaje", "Libro no encontrado");
	            response.put("status", HttpStatus.NOT_FOUND);
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	        	
	            
	        } else {
	        	libroRepository.deleteById(id);
	            response.put("mensaje", "Libro eliminado correctamente");
	            response.put("status", HttpStatus.OK);
	            return ResponseEntity.status(HttpStatus.OK).body(response);
	        }

	    } catch (Exception e) {
	        response.put("mensaje", "Error al eliminar el producto: " + e.getMessage());
	        response.put("status", HttpStatus.BAD_REQUEST);
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	    }
	}

	@Override
	public ResponseEntity<Map<String, Object>> actualizarLibro(Long id, Libro libro) {
		
		Map<String, Object> response = new HashMap<>();
		Optional<Libro> libroActualizar = libroRepository.findById(id);
		
		try {
		
			if (libroActualizar.isEmpty()) {
				response.put("mensaje", "No se encontro libro");
	            response.put("status", HttpStatus.NOT_FOUND);
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	            
	        } else {
	            
	            Libro libroNuevo = libroActualizar.get();
	            libroNuevo.setTitulo(libro.getTitulo());
	            libroNuevo.setAnioPublicacion(libro.getAnioPublicacion());
	            libroNuevo.setAutor(libro.getAutor());
	            libroNuevo.setCategoria(libro.getCategoria());
	            libroNuevo.setResumen(libro.getResumen());
	            libroNuevo.setImagenPortada(libro.getImagenPortada());
	            
	            Libro actualizado = libroRepository.save(libroNuevo);
	            
	            response.put("mensaje", "Libro actualizado correctamente");
	            response.put("libro", actualizado);
	            response.put("status", HttpStatus.OK);
	            return ResponseEntity.status(HttpStatus.OK).body(response);
	        }
		
		} catch (Exception e) {
		    response.put("mensaje", "Error al actualizar producto: " + e.getMessage());
		    response.put("status", HttpStatus.BAD_REQUEST);
		    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
	}

	@Override
	public ResponseEntity<Map<String, Object>> guardarLibro(Libro libro) {
		
		Map<String, Object> response = new HashMap<>();
		
		
		try {
		       Libro nuevoLibro = libroRepository.save(libro);
		       response.put("mensaje", "Se registro el libro correctamente");
		       response.put("libro", nuevoLibro);
		       response.put("status", HttpStatus.CREATED);
		       return ResponseEntity.status(HttpStatus.CREATED).body(response);
		   } catch (Exception e) {
		       response.put("mensaje", "Error al registrar el libro: " + e.getMessage());
		       response.put("status", HttpStatus.BAD_REQUEST);
		       return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		   }
	}

	@Override
	public ResponseEntity<Map<String, Object>> obtenerLibroPorCategoria(String categoria) {
		Map<String, Object> response = new HashMap<>();

	    try {
	        List<Libro> librosPorCategoria = libroRepository.findByCategoria(categoria);

	        if (librosPorCategoria.isEmpty()) {
	            response.put("mensaje", "No se encontraron libros en la categoría: " + categoria);
	            response.put("status", HttpStatus.NOT_FOUND);
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	        } else {
	            response.put("mensaje", "Libros encontrados en la categoría: " + categoria);
	            response.put("status", HttpStatus.OK);
	            response.put("libros", librosPorCategoria);
	            return ResponseEntity.status(HttpStatus.OK).body(response);
	        }

	    } catch (Exception e) {
	        response.put("mensaje", "Error al buscar libros por categoría: " + e.getMessage());
	        response.put("status", HttpStatus.BAD_REQUEST);
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	    }
	}



}
