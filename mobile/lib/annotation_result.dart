import 'dart:collection';

import 'package:flutter/material.dart';

class AnnotationResult extends StatelessWidget {
  AnnotationResult({Key? key, @required this.data}) : super(key: key);

  final dynamic data;

  @override
  Widget build(BuildContext context) {
    List<MapEntry<double, String>> attributes = data['attributes']
        .keys
        .map<MapEntry<double, String>>((item) => MapEntry(
            double.parse(data['attributes'][item].toString()), item.toString()))
        .toList();

    attributes.sort((a, b) => a.key > b.key ? -1 : 1);

    print(data['categories'].keys);
    List<MapEntry<double, String>> categories = data['categories']
        .keys
        .map<MapEntry<double, String>>((item) => MapEntry(
            double.parse(data['categories'][item].toString()), item.toString()))
        .toList();

    categories.sort((a, b) => a.key > b.key ? -1 : 1);

    print(attributes);
    print(categories);

    var colors = data['colors'].map<String>((x) => x.toString()).toList();

    // print(colors);

    return Scaffold(
      appBar: AppBar(
        title: Text('Annotation Result'),
      ),
      body: Container(
        child: Column(
          children: [
            Flexible(
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: 5,
                itemBuilder: (context, index) {
                  return Padding(
                    padding: EdgeInsets.all(8.0),
                    child: Chip(
                      label: Text(
                        colors[index],
                      ),
                    ),
                  );
                },
              ),
            ),
            Flexible(
              flex: 3,
              child: Row(
                children: [
                  Flexible(
                    child: ListView.builder(
                      itemCount: 5,
                      itemBuilder: (context, index) {
                        return ListTile(
                          title: Text(
                            categories[index].value,
                          ),
                          subtitle: Text(
                            categories[index].key.toStringAsFixed(4),
                          ),
                        );
                      },
                    ),
                  ),
                  Flexible(
                    child: ListView.builder(
                      itemCount: 5,
                      itemBuilder: (context, index) {
                        return ListTile(
                          title: Text(
                            attributes[index].value,
                          ),
                          subtitle: Text(
                            attributes[index].key.toStringAsFixed(4),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
