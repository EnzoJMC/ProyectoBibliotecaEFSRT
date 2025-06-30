package com.example.security;

import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
public class SecurityConfig {

	private final UserDetailsService userDetailsService;
	private final JWTAuthorizationFilter jwtAuthorizationFilter;
	
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http, AuthenticationManager authManager) throws Exception {

		JWTAuthenticationFilter jwtAutheticationFilter = new JWTAuthenticationFilter();
		jwtAutheticationFilter.setAuthenticationManager(authManager);
		jwtAutheticationFilter.setFilterProcessesUrl("/login");

		return http
			.csrf(csrf -> csrf.disable())
			.cors()
			.and()
			.authorizeHttpRequests(auth -> auth
				.requestMatchers("/login").permitAll()
				.requestMatchers("/api/usuarios/crear").permitAll()
				.requestMatchers("/img/**").permitAll()
				.anyRequest().authenticated()
				
			)
			.addFilter(jwtAutheticationFilter)
			.addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class)
			.build();
	}

	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	/*
	@Bean
	UserDetailsService userDetailsService() {
		InMemoryUserDetailsManager memorymanager = new InMemoryUserDetailsManager();
		
		memorymanager.createUser(
				User
				.withUsername("enzo")
				.password(passwordEncoder().encode("enzo"))
				.roles()
				.build()
				);
		
		return memorymanager;
	}
	*/
	
	@Bean
	AuthenticationManager authManager(HttpSecurity http) throws Exception {
		return http.getSharedObject(AuthenticationManagerBuilder.class)
				.userDetailsService(userDetailsService)
				.passwordEncoder(passwordEncoder())
				.and()
				.build();
	}
	
	
	/*
	public static void main(String[] args) {
		System.out.println("Contaseña encriptada: " + new BCryptPasswordEncoder().encode("hola123"));
	}
	
	*/	
	
	
	
}
