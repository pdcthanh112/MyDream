package com.congthanh.project.sercurity;

import com.congthanh.project.jwt.JwtConfig;
import com.congthanh.project.jwt.TokenVerifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter{

    //private final ApplicationUserService applicationUserService;
    private JwtConfig jwtConfig;
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().addFilterBefore(new TokenVerifier(jwtConfig), UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests().antMatchers("/auth/register",
                        "/auth/login",
                        "/auth/**",
                        "/city/**",
                        "/recruitmentRequest/getAll",
                        "/recruitmentRequest/getById",
                        "/recruitmentRequest/getOpenRecruitmentRequest",
                        "/swagger-resources/**",
                        "/v2/api-docs",
                        "/webjars/**",
                        "/v3/api-docs/**",
                        "/swagger-ui.html/**",
                        "/v3/api-docs/",
                        "/swagger-ui/**",
                        "/recruitmentRequest/**",
                        "/employee/**",
                        "/interview/**")
                .permitAll()
                .anyRequest().authenticated();

    }

}
