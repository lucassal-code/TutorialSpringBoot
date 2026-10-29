package com.exemplo.backend;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mercadorias")
public class MercadoriaController {

    @GetMapping
    public List<Map<String, Object>> listar() {
        
        return List.of(
            Map.of("id", 1, "nome", "Teclado", "preco", 120.00),
            Map.of("id", 2, "nome", "Mouse", "preco", 65.00)
        );
    }
}
