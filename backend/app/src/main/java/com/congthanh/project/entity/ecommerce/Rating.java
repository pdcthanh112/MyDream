package com.congthanh.project.entity.ecommerce;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "rating")
public class Rating   {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int vote;
    private float value;

    @OneToOne(mappedBy = "rating", cascade = CascadeType.ALL)
    @JsonIgnore
    private Product product;

}
