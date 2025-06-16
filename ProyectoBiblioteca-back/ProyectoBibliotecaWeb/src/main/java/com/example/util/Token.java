package com.example.util;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class Token {

	private final static Long TOKEN_DURACION = 3_600L;
	private final static String TOKEN_SECRETO ="iXCsfxpwysFZJ4P27FMlSm9THCYiHJpZ";
	
	public static String crearToken(String email,String tipoUsuario) {
		
		long expiracionTiempo = TOKEN_DURACION * 1_000L;
		Date expiracionFecha = new Date(System.currentTimeMillis() + expiracionTiempo);

		Map<String, Object> claims = new HashMap<>();
		claims.put("username", email);         
		claims.put("tipoUsuario", tipoUsuario); 

		return Jwts.builder()
				.setSubject(email)
				.setExpiration(expiracionFecha)
				.addClaims(claims)
				.signWith(Keys.hmacShaKeyFor(TOKEN_SECRETO.getBytes()))
				.compact();
	
		
	}
	
	
	public static UsernamePasswordAuthenticationToken getAuth(String token) {
		
		try {
			Claims claims = Jwts.parserBuilder()
					.setSigningKey(TOKEN_SECRETO.getBytes())
					.build().parseClaimsJws(token)
					.getBody();
			
			String email = claims.getSubject();
			
			return new UsernamePasswordAuthenticationToken(email, null, Collections.emptyList());
			
		}catch(Exception e) {
			System.out.println("Error en el metodo de valdiaciond e token: " + e);
			return null;
		}
	}
}
