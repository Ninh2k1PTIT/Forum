package com.example.forumbe.mapped;

import com.example.forumbe.dto.CommentVoteDTO;
import com.example.forumbe.entity.CommentVote;
import com.example.forumbe.repository.CommentRepository;
import com.example.forumbe.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CommentVoteMapped {
    static UserRepository userRepository;
    static CommentRepository commentRepository;

    @Autowired
    public CommentVoteMapped(UserRepository userRepository, CommentRepository commentRepository) {
        CommentVoteMapped.userRepository = userRepository;
        CommentVoteMapped.commentRepository = commentRepository;
    }

    public static CommentVote convertToEntity(CommentVoteDTO commentVoteDTO) {
        CommentVote commentVote = new CommentVote();
        commentVote.setId(commentVoteDTO.getId());
        commentVote.setUpVote(commentVoteDTO.isUpVote());
        System.out.println(commentVoteDTO.getUserId());
        commentVote.setUser(userRepository.findById(commentVoteDTO.getUserId()).get());
        commentVote.setComment(commentRepository.findById(commentVoteDTO.getCommentId()).get());
        commentVote.setUpdatedAt(commentVoteDTO.getUpdatedAt());
        return commentVote;
    }

    public static CommentVoteDTO convertToDTO(CommentVote commentVote) {
        CommentVoteDTO commentVoteDTO = new CommentVoteDTO();
        commentVoteDTO.setId(commentVote.getId());
        commentVoteDTO.setUserId(commentVote.getUser().getId());
        commentVoteDTO.setCommentId(commentVote.getComment().getId());
        commentVoteDTO.setUpVote(commentVote.isUpVote());
        commentVoteDTO.setUpdatedAt(commentVote.getUpdatedAt());
        return commentVoteDTO;
    }
}
