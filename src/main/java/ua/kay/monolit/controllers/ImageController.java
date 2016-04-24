package ua.kay.monolit.controllers;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ua.kay.monolit.models.Image;
import ua.kay.monolit.repositories.ImageRepository;

import java.io.IOException;
import java.util.List;

@RestController
public class ImageController {

    @Autowired
    BeanFactory beanFactory;

    @Autowired
    ImageRepository imageRepository;

    @RequestMapping(value = "/image/save", method = RequestMethod.POST)
    public Long saveImages(@RequestParam("file") MultipartFile file){
        Image image = beanFactory.getBean(Image.class);
        try {
            image.setImage(file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        Image savedImage = imageRepository.save(image);
        return savedImage.getIdImage();
    }

}