BEGIN;

TRUNCATE
    blogposts
RESTART IDENTITY CASCADE;

INSERT INTO blogposts (content, published, "createdAt", "updatedAt")
VALUES
    ('<h1>Barbey Street</h1><img src=''https://i.imgur.com/FhPqUyC.jpg'' alt=''DJ placeholder'' width=''200px''/> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa id neque aliquam vestibulum morbi blandit cursus. Interdum varius sit amet mattis. Lectus arcu bibendum at varius. Aliquet porttitor lacus luctus accumsan. Scelerisque varius morbi enim nunc faucibus a pellentesque sit. Diam maecenas ultricies mi eget. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Nibh cras pulvinar mattis nunc sed blandit libero. Lectus proin nibh nisl condimentum id venenatis a. Amet nisl suscipit adipiscing bibendum est ultricies integer.</p>', 'true', '2019-12-25 19:54:58', '2020-01-06 19:54:58'),
    ('<h1>Hicks Street</h1><img src=''https://i.imgur.com/FhPqUyC.jpg'' alt=''DJ placeholder'' width=''200px''/> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa id neque aliquam vestibulum morbi blandit cursus. Interdum varius sit amet mattis. Lectus arcu bibendum at varius. Aliquet porttitor lacus luctus accumsan. Scelerisque varius morbi enim nunc faucibus a pellentesque sit. Diam maecenas ultricies mi eget. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Nibh cras pulvinar mattis nunc sed blandit libero. Lectus proin nibh nisl condimentum id venenatis a. Amet nisl suscipit adipiscing bibendum est ultricies integer.</p>', 'true', '2020-01-01 19:56:28', '2020-01-06 19:56:28'),
    ('<h1>Fillmore Place</h1><img src=''https://i.imgur.com/FhPqUyC.jpg'' alt=''DJ placeholder'' width=''200px''/> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa id neque aliquam vestibulum morbi blandit cursus. Interdum varius sit amet mattis. Lectus arcu bibendum at varius. Aliquet porttitor lacus luctus accumsan. Scelerisque varius morbi enim nunc faucibus a pellentesque sit. Diam maecenas ultricies mi eget. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Nibh cras pulvinar mattis nunc sed blandit libero. Lectus proin nibh nisl condimentum id venenatis a. Amet nisl suscipit adipiscing bibendum est ultricies integer.</p>', 'true', '2020-01-02 19:56:51', '2020-01-06 19:56:51'),
    ('<h1>Brigham Street</h1><img src=''https://i.imgur.com/FhPqUyC.jpg'' alt=''DJ placeholder'' width=''200px''/> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa id neque aliquam vestibulum morbi blandit cursus. Interdum varius sit amet mattis. Lectus arcu bibendum at varius. Aliquet porttitor lacus luctus accumsan. Scelerisque varius morbi enim nunc faucibus a pellentesque sit. Diam maecenas ultricies mi eget. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Nibh cras pulvinar mattis nunc sed blandit libero. Lectus proin nibh nisl condimentum id venenatis a. Amet nisl suscipit adipiscing bibendum est ultricies integer.</p>', 'true', '2020-01-03 19:59:55', '2020-01-06 19:59:55'),
    ('<h1>Lloyd Court</h1><img src=''https://i.imgur.com/FhPqUyC.jpg'' alt=''DJ placeholder'' width=''200px''/> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa id neque aliquam vestibulum morbi blandit cursus. Interdum varius sit amet mattis. Lectus arcu bibendum at varius. Aliquet porttitor lacus luctus accumsan. Scelerisque varius morbi enim nunc faucibus a pellentesque sit. Diam maecenas ultricies mi eget. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Nibh cras pulvinar mattis nunc sed blandit libero. Lectus proin nibh nisl condimentum id venenatis a. Amet nisl suscipit adipiscing bibendum est ultricies integer.</p>', 'false', '2020-01-04 20:00:29', '2020-01-06 20:00:29'),
    ('<h1>Wayland Way</h1><img src=''https://i.imgur.com/FhPqUyC.jpg'' alt=''DJ placeholder'' width=''200px''/> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa id neque aliquam vestibulum morbi blandit cursus. Interdum varius sit amet mattis. Lectus arcu bibendum at varius. Aliquet porttitor lacus luctus accumsan. Scelerisque varius morbi enim nunc faucibus a pellentesque sit. Diam maecenas ultricies mi eget. At erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Nibh cras pulvinar mattis nunc sed blandit libero. Lectus proin nibh nisl condimentum id venenatis a. Amet nisl suscipit adipiscing bibendum est ultricies integer.</p>', 'true', '2020-01-06 20:55:48', '2020-01-09 13:40:56');
COMMIT;