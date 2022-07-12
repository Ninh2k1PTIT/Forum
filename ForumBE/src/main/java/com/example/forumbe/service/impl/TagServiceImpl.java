package com.example.forumbe.service.impl;

import com.example.forumbe.dto.DataResponse;
import com.example.forumbe.dto.TagDTO;
import com.example.forumbe.entity.Tag;
import com.example.forumbe.mapped.TagMapped;
import com.example.forumbe.repository.TagRepository;
import com.example.forumbe.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagServiceImpl implements TagService {
    @Autowired
    private TagRepository tagRepository;

    @Override
    public DataResponse<List<TagDTO>> getAll() {
        List<Tag> tags = tagRepository.findAll();
        List<TagDTO> tagDTOS = new ArrayList<>();
        DataResponse<List<TagDTO>> dataResponse = new DataResponse<>();
        for (Tag tag: tags) {
            tagDTOS.add(TagMapped.convertToDTO(tag));
        }
        dataResponse.setData(tagDTOS);
        dataResponse.setTotalItems(tagDTOS.size());
        return dataResponse;
    }

    @Override
    public TagDTO save(TagDTO tagDTO) {
        Tag tag = new Tag();
        tag.setName(tagDTO.getName());
        return TagMapped.convertToDTO(tagRepository.save(tag));
    }

    @Override
    public DataResponse<List<TagDTO>> getByName(String name) {
        DataResponse<List<TagDTO>> dataResponse = new DataResponse<>();
        List<TagDTO> tagDTOS = tagRepository.findByName(name).stream().map(item -> TagMapped.convertToDTO(item)).collect(Collectors.toList());
        dataResponse.setData(tagDTOS);
        dataResponse.setTotalItems(tagDTOS.size());
        return dataResponse;
    }
}
