package com.example.serviceImpl;

import java.util.Collection;

import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.model.Usuario;

import lombok.AllArgsConstructor;

@AllArgsConstructor

public class UserDetailImplement implements UserDetails{

	private final Usuario usuario;
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return Collections.emptyList();
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return usuario.getContrasena();
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return usuario.getCorreo();
	}

	public String getUser() {
		return usuario.getNombre();
	}
	
	public String getUserTipe() {
		return usuario.getTipoUsuario();
	}
	
}
