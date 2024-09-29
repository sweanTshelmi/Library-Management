package service;

import com.example.SpringSecurity.model.MemberModel;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {
    private final String SECRET_KEY="d58c711f50d9022de74a7b14775463ed59cd51f8b581dfa6f35256ab24b60df2";
    private String generateToken(MemberModel memberModel, long expireTime) {
        String token = Jwts
                .builder()
                .subject(memberModel.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expireTime ))
                .signWith(getSigninKey())
                .compact();

        return token;
    }

}
