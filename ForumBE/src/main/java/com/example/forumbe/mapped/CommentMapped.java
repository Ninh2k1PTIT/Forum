package com.example.forumbe.mapped;

import com.example.forumbe.dto.CommentDTO;
import com.example.forumbe.entity.Comment;
import com.example.forumbe.repository.PostRepository;
import com.example.forumbe.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class CommentMapped {
    static PostRepository postRepository;
    static UserRepository userRepository;

    @Autowired
    public CommentMapped(PostRepository postRepository, UserRepository userRepository) {
        CommentMapped.postRepository = postRepository;
        CommentMapped.userRepository = userRepository;
    }

    public static CommentDTO convertToDTO(Comment comment) {
        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setId(comment.getId());
        commentDTO.setBody(comment.getBody());
        commentDTO.setUserId(comment.getUser().getId());
        commentDTO.setPostId(comment.getPost().getId());
        commentDTO.setUsername(comment.getUser().getUsername());
        commentDTO.setCreatedAt(comment.getCreatedAt());
        commentDTO.setCommentVotes(comment.getCommentVotes().stream().map(item -> CommentVoteMapped.convertToDTO(item)).collect(Collectors.toList()));
        return commentDTO;
    }

    public static Comment convertToEntity(CommentDTO commentDTO) {
        Comment comment = new Comment();
        comment.setId(commentDTO.getId());
        comment.setBody(commentDTO.getBody());
        comment.setPost(postRepository.findById(commentDTO.getPostId()).get());
        comment.setUser(userRepository.findById(commentDTO.getUserId()).get());
        comment.setCreatedAt(commentDTO.getCreatedAt());
        comment.setCommentVotes(commentDTO.getCommentVotes().stream().map(item -> CommentVoteMapped.convertToEntity(item)).collect(Collectors.toList()));
        return comment;
    }
}
