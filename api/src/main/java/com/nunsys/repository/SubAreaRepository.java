package com.nunsys.repository;

import com.nunsys.domain.SubArea;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SubArea entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubAreaRepository extends JpaRepository<SubArea, Long> {

}
