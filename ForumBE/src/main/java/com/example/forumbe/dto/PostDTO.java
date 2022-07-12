package com.example.forumbe.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class PostDTO {
    private Long id;
    private String title;
    private String body;
    private Date createdAt;
    private Date updatedAt;
    private Date closedAt;
    private boolean isOpen;
    private Long userId;
    private String username;
    private List<TagDTO> tags;
    private List<PostVoteDTO> postVotes;

    public PostDTO() {
    }

}