package com.example.security;

import java.io.IOException;
import java.util.Collections;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.model.Auth;
import com.example.serviceImpl.UserDetailImplement;
import com.example.util.Token;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		
		Auth authCredenciales = new Auth();
		
		try {
			authCredenciales = new ObjectMapper().readValue(request.getReader(), Auth.class);
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		UsernamePasswordAuthenticationToken userPat = new UsernamePasswordAuthenticationToken(
				authCredenciales.getEmail(),
				authCredenciales.getPassword(),
				Collections.emptyList()); 
		
		return getAuthenticationManager().authenticate(userPat);
	} 
	
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
	        Authentication authResult) throws IOException, ServletException {

	    UserDetailImplement userDetail = (UserDetailImplement) authResult.getPrincipal();

	    String token = Token.crearToken(userDetail.getUsername(), userDetail.getUserTipe());

	    // Construimos la respuesta en formato JSON
	    String jsonResponse = new ObjectMapper().writeValueAsString(
	        Collections.singletonMap("token", token)
	    );

	    // Si quieres incluir también el tipo:
	    /*
	    Map<String, String> body = new HashMap<>();
	    body.put("token", token);
	    body.put("tipo", userDetail.getUserTipe());

	    String jsonResponse = new ObjectMapper().writeValueAsString(body);
	    */

	    // Configuramos la respuesta
	    response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");
	    response.getWriter().write(jsonResponse);
	    response.getWriter().flush();
	}
	
	
	

}
