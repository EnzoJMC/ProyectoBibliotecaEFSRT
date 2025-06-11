package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.model.Recomendacion;

@Repository
public interface RecomendacionRepository extends JpaRepository<Recomendacion, Long> {
	 List<Recomendacion> findByUsuarioId(Long id);
}
