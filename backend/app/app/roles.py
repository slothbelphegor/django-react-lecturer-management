from rest_framework_roles.roles import is_anon, is_user, is_admin, is_staff

def is_lecturer(request, view):
    return is_user(request, view) and request.user.groups[0].name == 'lecturer'

def is_potential_lecturer(request, view):
    return is_user(request, view) and request.user.groups[0].name == 'potential_lecturer'


ROLES = {
    # Django vanilla roles
    'anon': is_anon,
    'user': is_user,
    'admin': is_admin,
    'staff': is_staff,

    # Some custom role examples
    'lecturer': 
        lambda request, view: 
            is_user(request, view) 
            and request.user.groups[0].name == 'lecturer',
    'potential_lecturer': 
        lambda request, view: 
            is_user(request, view) 
            and request.user.groups[0].name == 'potential_lecturer',
    'it_faculty': 
        lambda request, view: 
            is_user(request, view) 
            and request.user.groups[0].name == 'it_faculty',
    'education_department': 
        lambda request, view: 
            is_user(request, view) 
            and request.user.groups[0].name == 'education_department',
    'supervision_department':
        lambda request, view: 
            is_user(request, view) 
            and request.user.groups[0].name == 'supervision_department',
    'it_faculty_or_lecturer': 
        lambda request, view: 
            is_user(request, view) and (request.user.groups[0].name == 'it_faculty' 
                                        or request.user.groups[0].name == 'lecturer'),
}