package ua.kay.monolith.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.scheduling.annotation.Async;
import ua.kay.monolith.model.SprColor;

import java.util.List;

public interface ColorRepository extends JpaRepository<SprColor, Integer> {
    @Async
    @Query("select p.sprColor from Product p " +
            "where p.sprCategory.idCategory = ?1 " +
            "group by p.sprColor.name, p.sprColor.idSprColors")
    List<SprColor> findColorsByProductCategoryId(Integer categoryId);

    void deleteByIdSprColors(Integer id);
}
