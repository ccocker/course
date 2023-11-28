SELECT
    t.firstName,
    cl.classNumber,
    o.startDate
FROM
    tutor t
INNER JOIN
    allocation al ON t.id = al.staff
    INNER JOIN
    groupClass cl ON al.courseCode = cl.coursecode
    AND al.groupNumber = cl.groupNumber
    AND al.classNumber = cl.classNumber
INNER JOIN
    courseGroup cg on cg.courseCode = al.courseCode
    and cg.groupNumber = al.groupNumber
INNER JOIN
    offering o on o.courseCode = cl.coursecode
INNER JOIN
    course c on c.code = o.courseCode
;

