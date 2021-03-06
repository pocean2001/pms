# -*- coding: utf-8 -*-
'''用例管理操作

@author: Gao Le
'''
from .db import TestCase, Demand, User
from .role import identity


# @identity.check_permission("create", 'task')
def create_case(case):
    '''新建案例'''
    # print("case", case)
    return TestCase.get_or_create(
        name=case['name'],
        defaults={
            'detail': case['detail'],
            'type': case['type'],
            'status': case['status'],
            'demandId': case['demandId'],
            'input': case['input'],
            'expect': case['expect'],
            'projectId': case['projectId'],
            'releaseId': case['releaseId'],
            'ownerId': case['ownerId']
        })


def case_detail(id):
    '''获取测试用例详情'''

    return TestCase.sfind(TestCase, Demand.title.alias('demandTittle'),User.username.alias('ownername')).join(Demand, on=(TestCase.demandId == Demand.id)).join(User, on=(TestCase.ownerId == User.id)).where(TestCase.id == id).get()


# @identity.check_permission("update", 'demand')
def case_update(case):
    TestCase.update(
        name=case['name'],
        detail=case['detail'],
        type=case['type'],
        status=case['status'],
        input=case['input'],
        expect=case['expect'],
        demandId=case['demandId']).where(TestCase.id == case['id']).execute()

    return TestCase.getOne(TestCase.id == case['id'])


def find_one_case_by_title(name):
    return TestCase.getOne(TestCase.name == name)


def find_name_by_id(id):
    return TestCase.getOne(TestCase.id == id).name
