package com.example.forumbe.mapped;

import com.example.forumbe.dto.PostVoteDTO;
import com.example.forumbe.entity.PostVote;
import com.example.forumbe.repository.PostRepository;
import com.example.forumbe.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PostVoteMapped {
    static PostRepository postRepository;
    static UserRepository userRepository;

    @Autowired
    public PostVoteMapped(PostRepository postRepository, UserRepository userRepository) {
        PostVoteMapped.postRepository = postRepository;
        PostVoteMapped.userRepository = userRepository;
    }

    public static PostVoteDTO convertToDTO(PostVote postVote) {
        PostVoteDTO postVoteDTO = new PostVoteDTO();
        postVoteDTO.setId(postVote.getId());
        postVoteDTO.setPostId(postVote.getPost().getId());
        postVoteDTO.setUserId(postVote.getUser().getId());
        postVoteDTO.setUpdatedAt(postVote.getUpdatedAt());
        postVoteDTO.setUpVote(postVote.isUpVote());
        return postVoteDTO;
    }

    public static PostVote convertToEntity(PostVoteDTO postVoteDTO) {
        PostVote postVote = new PostVote();
        postVote.setId(postVoteDTO.getId());
        postVote.setPost(postRepository.findById(postVoteDTO.getPostId()).get());
        postVote.setUser(userRepository.findById(postVoteDTO.getUserId()).get());
        postVote.setUpdatedAt(postVoteDTO.getUpdatedAt());
        postVote.setUpVote(postVoteDTO.isUpVote());
        return postVote;
    }
}
