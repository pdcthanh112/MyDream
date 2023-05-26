package com.congthanh.project.repository.ecommerce;

import com.congthanh.project.entity.ecommerce.Goods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface GoodsRepository extends JpaRepository<Goods, Integer> {

    Optional<Goods> findById(String id);

    Optional<Goods> findByName(String name);

    @Modifying
    @Query(nativeQuery = true, value = "UPDATE mydream.goods SET status = 'Deleted' WHERE id = ?1 ")
    boolean deleteGoods(String id);
}
