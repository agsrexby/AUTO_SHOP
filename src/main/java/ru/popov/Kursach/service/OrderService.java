package ru.popov.Kursach.service;

import org.springframework.stereotype.Service;
import ru.popov.Kursach.models.Order;
import ru.popov.Kursach.repositories.OrderRepository;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Optional<Order> getOrderById(int id) {
        return orderRepository.findById(id);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public void addOrder(Order order) {
        orderRepository.save(order);
    }

    public void updateOrder(int id, Order order) {
        orderRepository.update(order,id);
    }

    public void deleteOrder(int id) {
        orderRepository.deleteById(id);
    }

}
