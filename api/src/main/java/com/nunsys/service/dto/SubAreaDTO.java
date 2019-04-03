package com.nunsys.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the SubArea entity.
 */
public class SubAreaDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 100)
    private String descripcion;


    private Long areaId;

    private String areaDescripcion;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Long getAreaId() {
        return areaId;
    }

    public void setAreaId(Long areaId) {
        this.areaId = areaId;
    }

    public String getAreaDescripcion() {
        return areaDescripcion;
    }

    public void setAreaDescripcion(String areaDescripcion) {
        this.areaDescripcion = areaDescripcion;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SubAreaDTO subAreaDTO = (SubAreaDTO) o;
        if (subAreaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subAreaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SubAreaDTO{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            ", area=" + getAreaId() +
            ", area='" + getAreaDescripcion() + "'" +
            "}";
    }
}
