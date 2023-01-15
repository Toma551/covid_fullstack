package org.polytech.covid.repository;

import java.util.List;
import java.util.Optional;

import org.polytech.covid.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    public List<Utilisateur> findAllByloginIgnoreCaseLike(String name);

    @Query("from UTILISATEUR v where v.login like :login")
    public Optional<Utilisateur> findByLogin(@Param("login") String login);
}

