//package com.congthanh.project.auth;
//
//import com.congthanh.project.entity.management.Account;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import java.util.ArrayList;
//import java.util.Collection;
//
//@AllArgsConstructor
//@NoArgsConstructor
//@Data
//@Builder
//public class UserDetail implements UserDetails {
//    private Account account;
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        //SimpleGrantedAuthority authorities = new SimpleGrantedAuthority(account.getRole().getName());
//        SimpleGrantedAuthority authorities = new SimpleGrantedAuthority(account.getRole());
//        ArrayList<SimpleGrantedAuthority> list = new ArrayList<>();
//        list.add(authorities);
//        return list;
//    }
//
//    @Override
//    public String getPassword() {
//        //return account.getPassword();
//        return "";
//    }
//
//    @Override
//    public String getUsername() {
//        return null;
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return true;
//    }
//}
