package com.example.forumbe.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class CommentDTO {
    private Long id;
    private String body;
    private Long postId;
    private Long userId;
    private String username;
    private Date createdAt;
    private List<CommentVoteDTO> commentVotes;

    public CommentDTO() {
    }
}
