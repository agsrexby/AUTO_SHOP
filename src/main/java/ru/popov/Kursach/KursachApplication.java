package ru.popov.Kursach;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class KursachApplication {

	public static void main(String[] args) {

		SpringApplication.run(KursachApplication.class, args);
		String str = "321";
		System.out.println(BCrypt.hashpw(str, BCrypt.gensalt(12)));
	}

}
